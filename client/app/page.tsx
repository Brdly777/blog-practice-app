'use client';

import RegisterForm from '@/app/components/registrationForm';
import LoginForm from '@/app/components/loginForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm />
    </main>
  );
}