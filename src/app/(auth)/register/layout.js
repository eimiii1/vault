export const metadata = {
    title: 'Create your account | Vault',
    description: ''
}

export default function RegisterLayout({ children }) {
    return (
        <div
            className='flex flex-col justify-start items-center mt-10 h-screen w-screen'
        >
            {children}
        </div>
    )
}