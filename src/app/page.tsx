import { getFeatureFlags } from '@/service/feature-flags';

export default async function Home() {
  const featureFlags = await getFeatureFlags();

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='text-3xl font-bold'>Feature flags in Next.js 13</h1>
      <pre>
        <code>{JSON.stringify(featureFlags)}</code>
      </pre>
    </main>
  );
}
