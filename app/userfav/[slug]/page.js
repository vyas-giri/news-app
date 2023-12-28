"use client";
import React, { useState, useEffect } from 'react'
import { UserAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation';

function Page({params}) {
    const {user} = UserAuth()
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuthenticated = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50))
        }
        checkAuthenticated()
        
        if (!user) {
            router.push('/')
        }
        else {
            setLoading(false)
        }
    }, [user, router])

  return (
    <div>
    {loading ? null : <div>
        page
    </div>}
    </div>
  )
}

export default Page