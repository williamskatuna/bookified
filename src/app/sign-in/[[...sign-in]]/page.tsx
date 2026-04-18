import {SignIn} from '@clerk/nextjs'

export default function SignInPage() {
    return (

        <div className='min-h-screen bg-[#F5EFE4] flex items-center justify-center'>
            <SignIn forceRedirectUrl='/library'/>
        </div>
    )

}