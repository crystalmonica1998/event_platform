const Layout = ({ children } : { children: React.ReactNode }) => {
    return (
        <div className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-attern bg-cover bg-fixed bg-center">
            {children}
        </div>
    )
}

export default Layout