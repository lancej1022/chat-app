// import { Text, View } from "react-native";
import { Button, Checkbox, Text } from "@chat-app/base-component-lib";
import { createFileRoute, Link } from "@tanstack/react-router";

// import { ThemeToggle } from "~/components/ThemeToggle";

// import { Button, Checkbox, Text } from '@chat-app/base-component-lib';
// import { LoginScreen } from '@chat-app/features';

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <Button>
        <Text>Yeet</Text>
      </Button>
      <Checkbox checked={true} onCheckedChange={() => {}} />
      {/*<LoginScreen /> */}
    </>
    // <ThemeToggle />
    //   </nav>
    //   <header className='min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]'>
    //     <img
    //       className='h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]'
    //       alt='logo'
    //     />
    //     <p>
    //       Edit <code>src/routes/index.tsx</code> and save to reload.
    //     </p>
    //     <Link to='/signup'>
    //       <Button>
    //         <Text>Sign up</Text>
    //       </Button>
    //     </Link>
    //     <a
    //       className='text-[#61dafb] hover:underline'
    //       href='https://reactjs.org'
    //       target='_blank'
    //       rel='noopener noreferrer'
    //     >
    //       Learn React
    //     </a>
    //     <a
    //       className='text-[#61dafb] hover:underline'
    //       href='https://tanstack.com'
    //       target='_blank'
    //       rel='noopener noreferrer'
    //     >
    //       Learn TanStack
    //     </a>
    //   </header>
    // </div>
  );
}
