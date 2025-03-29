import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser({ name, linkedIn, dish, session }) {
  return prisma.user.create({
    data: {
      name,
      linkedIn,
      dish,
      session,
    },
  });
}

export async function createMatch(userIds) {
  return prisma.match.create({
    data: {
      users: {
        connect: userIds.map((id) => ({ id })),
      },
    },
    include: {
      users: true,
    },
  });
}

export async function getUser(id) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      matches: {
        include: {
          users: true,
        },
      },
    },
  });
}

export async function getUsers() {
  return prisma.user.findMany({
    include: {
      matches: true,
    },
  });
}

export async function getUnmatchedUsers(session) {
  return prisma.user.findMany({
    where: {
      session,
      matches: {
        none: {},
      },
    },
  });
}

export async function updateUserMatchId(userId, matchId) {
  return prisma.user.update({
    where: { id: userId },
    data: { matchId },
  });
}
