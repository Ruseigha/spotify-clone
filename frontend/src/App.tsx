import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react"

function App() {

  return (
    <>
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </>
  )
}

export default App
