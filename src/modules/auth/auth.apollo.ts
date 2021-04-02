import { AuthChecker } from 'type-graphql';

const GraphqlAuthChecker: AuthChecker<DataContext> = (
  {
    context: {
      req: { user },
    },
  },
  roles
): boolean => {
  if (!user) {
    return false;
  }

  if (roles.length === 0) {
    // if `@Authorized()`, check only if user exists
    return user?.id !== undefined;
  }

  const mappedUserRoles: string[] = !user
    ? []
    : user.roles.map((role) => role.name);

  // true if any roles overlap. false if none match

  return mappedUserRoles.some((role) => roles.includes(role));
};

export default GraphqlAuthChecker;
