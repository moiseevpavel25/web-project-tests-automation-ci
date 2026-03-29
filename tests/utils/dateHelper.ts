export function calculateAge(doB: string): number {
        const birth = new Date(doB)
        const current = new Date()
        let age = current.getFullYear() - birth.getFullYear()
        const monthDiff = current.getMonth() - birth.getMonth()
        const dayDiff = current.getDate() - birth.getDate()
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--
        return age
    }