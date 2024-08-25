import { Group, Member } from "@prisma/client";

export type GroupItem = Group & { members: Member[] };
