import {
  AppConfigDataClient,
  StartConfigurationSessionCommand,
  type StartConfigurationSessionRequest,
  type GetLatestConfigurationRequest,
  GetLatestConfigurationCommand,
} from '@aws-sdk/client-appconfigdata';

let nextToken: string;
let featureFlags: Record<string, unknown>;
let startTime = Date.now();

const polling = Number(
  process.env.APPCONFIG_REQUIREDMINIMUMPOLLINTERVALINSECONDS
);
let pollingInterval = polling;

const client = new AppConfigDataClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function initConfig() {
  const input: StartConfigurationSessionRequest = {
    // StartConfigurationSessionRequest
    ApplicationIdentifier: process.env.APPCONFIG_APPLICATIONIDENTIFIER,
    EnvironmentIdentifier: process.env.APPCONFIG_ENVIRONMENTIDENTIFIER,
    ConfigurationProfileIdentifier:
      process.env.APPCONFIG_CONFIGURATIONPROFILEIDENTIFIER,
    RequiredMinimumPollIntervalInSeconds: polling,
  };

  const command = new StartConfigurationSessionCommand(input);
  const response = await client.send(command);
  nextToken = response.InitialConfigurationToken || '';
}

function minimumPollingInterval(currentTime: number) {
  const timeElapsed = currentTime - startTime;
  const secondsPassed = timeElapsed / 1000;
  if (secondsPassed >= pollingInterval) {
    startTime = Date.now();
    return true;
  } else {
    return false;
  }
}

export async function getFeatureFlags() {
  if (!nextToken) {
    await initConfig();
  }
  if (!minimumPollingInterval(Date.now())) return featureFlags;

  const inputGetLastestConfig: GetLatestConfigurationRequest = {
    ConfigurationToken: nextToken,
  };

  const command = new GetLatestConfigurationCommand(inputGetLastestConfig);

  const response = await client.send(command);
  pollingInterval = response.NextPollIntervalInSeconds || polling;
  const config = response.Configuration;
  if (config) {
    const jsonString = Buffer.from(config?.buffer).toString();
    if (!jsonString) return featureFlags;

    featureFlags = JSON.parse(jsonString);
    nextToken = response.NextPollConfigurationToken || '';
    return featureFlags;
  }
}
