# Next.js Feature flags example

This is a example of how to use feature flags with Next.js 13 App Router

you can check the `feature/_branch` where i use diferent **feature flags providers**
the goal of this architecture is remove the business logic from the view

```Typescript
//We only have to import the method in order to get the featureFlags object

import {getFeatureFlags} from "@/service/feature-flags"

...

const featureFlags = await getFeatureFlags()
```

## Local development

Just create and `.env.local` file with the corresponding variables depends on witch **branch/provider** are you trying

```Bash
#AWS AppConfig Flags
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
APPCONFIG_APPLICATIONIDENTIFIER=
APPCONFIG_ENVIRONMENTIDENTIFIER=
APPCONFIG_CONFIGURATIONPROFILEIDENTIFIER=
APPCONFIG_REQUIREDMINIMUMPOLLINTERVALINSECONDS=

#Flagsmith Feature Flags
FLAGSMITH_ENVIROMENT_KEY=
```

## Contribute

Feel free to add more examples of how to use different feature flags providers

## Links

[AWS AppConfig](https://aws.amazon.com/es/systems-manager/features/appconfig/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&blog-posts-cards.sort-by=item.additionalFields.createdDate&blog-posts-cards.sort-order=desc)

[FlagSmith](https://www.flagsmith.com/)
