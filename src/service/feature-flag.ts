import { createFlagsmithInstance } from 'flagsmith/isomorphic';

export async function getFeatureFlags() {
  const flagSmithSSR = createFlagsmithInstance();
  await flagSmithSSR.init({
    environmentID: process.env.FLAGSMITH_ENVIROMENT_KEY || '',
  });

  return flagSmithSSR.getAllFlags();
}
