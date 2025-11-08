import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Logo() {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        // optional: show a placeholder or just render one default logo
        return (
            <img
                src="/logo1_light_mode.png"
                alt="Encora Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
            />
        )
    }

    const logoPath = resolvedTheme === "dark" 
        ? "/logo2_dark_mode (1).png" 
        : "/logo1_light_mode.png"
    
    return (
        <img
            src={logoPath}
            alt="Encora Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
        />
    )
}
