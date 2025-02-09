import { CreateExpenseInput, MemberAmount } from "@/app/types";
import { getSession } from "@auth0/nextjs-auth0";
import { Group, User, Owe, Prisma, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const createExpenseInput: CreateExpenseInput = await request.json();
  const session = await getSession();
  const payor: User | null = await prisma.user.findUnique({
    where: {
      name: session?.user?.name,
    },
  });
  const group: Group | null = await prisma.group.findUnique({
    where: {
      id: createExpenseInput.groudId,
    },
  });
  const expenseInput: Prisma.ExpenseCreateInput = {
    name: createExpenseInput.name,
    amount: createExpenseInput.amount,
    admin: {
      connect: payor!,
    },
    group: {
      connect: group!,
    },
  };

  const memberAmountList: MemberAmount[] = createExpenseInput.memberAmountList;
  const length: number = memberAmountList.length;
  const memberIndexMap: Map<string, number> = new Map();
  const memberOweGraph: number[][] = new Array(length);
  const memberAmountMap: Map<string, number> = new Map();
  const memberNameToMemberMap: Map<string, User> = new Map();
  const oweList: Owe[] = [];

  // Populate memberIndexMap and memberAmountMap
  for (let index = 0; index < length; index++) {
    const name: string = memberAmountList[index].name;
    const amount: number = memberAmountList[index].amount;
    const member: User | null = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });

    if (member) {
      memberNameToMemberMap.set(name, member);
      memberIndexMap.set(name, index);
      memberAmountMap.set(name, amount);
    }
  }

  // Get owe amount for each member
  for (let row = 0; row < length; row++) {
    memberOweGraph[row] = new Array(length);

    for (let col = 0; col < length; col++) {
      const owe: Owe | null = await prisma.owe.findFirst({
        where: {
          AND: {
            from: {
              name: memberAmountList[row].name,
            },
            to: {
              name: memberAmountList[col].name,
            },
          },
        },
      });

      if (owe) {
        memberOweGraph[row][col] = owe.amount;
        oweList.push(owe);
      } else {
        memberOweGraph[row][col] = 0;

        const owe: Owe = await prisma.owe.create({
          data: {
            from: {
              connect: memberNameToMemberMap.get(memberAmountList[row].name),
            },
            to: {
              connect: memberNameToMemberMap.get(memberAmountList[col].name),
            },
            amount: 0,
            group: {
              connect: group!,
            },
          },
        });
        oweList.push(owe);
      }

      memberOweGraph[row][col] = owe ? owe.amount : 0;
    }
  }

  const payorIndex: number = memberIndexMap.get(payor?.name!)!;

  // Process owe graph
  memberIndexMap.forEach((memberIndex, member) => {
    if (member !== payor?.name! && memberAmountMap.get(member) !== 0) {
      if (memberOweGraph[payorIndex][memberIndex] !== 0) {
        const diff: number =
          memberOweGraph[payorIndex][memberIndex] -
          memberAmountMap.get(member)!;

        if (diff === 0) {
          memberOweGraph[memberIndex][payorIndex] = 0;
          memberOweGraph[payorIndex][memberIndex] = 0;
        } else if (diff > 0) {
          memberOweGraph[payorIndex][memberIndex] = diff;
        } else {
          memberOweGraph[payorIndex][memberIndex] = 0;
          memberOweGraph[memberIndex][payorIndex] = Math.abs(diff);
        }
      } else {
        memberOweGraph[memberIndex][payorIndex] += memberAmountMap.get(member)!;
      }
    }
  });

  // Update owe graph
  for (let row = 0; row < length; row++) {
    const fromMember: string = memberAmountList[row].name;
    for (let col = 0; col < length; col++) {
      if (row !== col) {
        const toMember: string = memberAmountList[col].name;
        const amount: number = memberOweGraph[row][col];

        await prisma.owe.updateMany({
          where: {
            fromMemberId: memberNameToMemberMap.get(fromMember)?.id!,
            toMemberId: memberNameToMemberMap.get(toMember)?.id!,
          },
          data: {
            amount: amount,
          },
        });
      }
    }
  }

  const expense = await prisma.expense.create({
    data: expenseInput,
  });

  const payInput: Prisma.TransactionCreateManyInput[] = [];
  for (const memberAmount of createExpenseInput.memberAmountList) {
    const payee: User | null = await prisma.user.findUnique({
      where: {
        name: memberAmount.name,
      },
    });

    payInput.push({
      amount: memberAmount.amount,
      isPayor: payee?.id === payor?.id,
      userId: payee?.id!,
      expenseId: expense.id,
    });
  }

  await prisma.transaction.createMany({
    data: payInput,
  });

  const pays = await prisma.transaction.findMany({
    where: { expense: expense },
    select: {
      id: true,
    },
  });

  await prisma.expense.update({
    where: {
      id: expense.id,
    },
    data: {
      transactions: {
        connect: pays,
      },
    },
  });

  return Response.json("Expense created successfully.");
}
