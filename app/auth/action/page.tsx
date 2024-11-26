'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import {
  verifyPasswordResetCode,
  applyActionCode,
  checkActionCode,
} from 'firebase/auth'
import { auth } from '@/lib/firebase/firebase-config'

type ActionStatus = {
  message: string
  isError?: boolean
}

const ActionContent: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)
  const [status, setStatus] = useState<ActionStatus>({
    message: 'Processing...',
  })

  useEffect(() => {
    const mode = searchParams.get('mode')
    const oobCode = searchParams.get('oobCode')

    if (!mode || !oobCode) {
      setStatus({
        message: 'Invalid or missing parameters. Redirecting...',
        isError: true,
      })
      setTimeout(() => router.push('/'), 2000)
      setIsProcessing(false)
      return
    }

    const processAction = async () => {
      try {
        switch (mode) {
          case 'resetPassword':
            // Verify the code first
            await verifyPasswordResetCode(auth, oobCode)
            setStatus({ message: 'Redirecting to password reset...' })
            await router.push(`/reset-password?oobCode=${oobCode}`)
            break

          case 'verifyEmail':
            await applyActionCode(auth, oobCode)
            setStatus({
              message: 'Email verified successfully! Redirecting...',
            })
            setTimeout(() => router.push('/login'), 2000)
            break

          case 'recoverEmail':
            const info = await checkActionCode(auth, oobCode)
            await applyActionCode(auth, oobCode)
            setStatus({
              message: `Email recovery successful: ${info.data.email}. Redirecting...`,
            })
            setTimeout(() => router.push('/login'), 2000)
            break

          default:
            setStatus({
              message: 'Invalid action type. Redirecting...',
              isError: true,
            })
            setTimeout(() => router.push('/'), 2000)
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred'
        setStatus({
          message: `Action failed: ${errorMessage}`,
          isError: true,
        })
        setTimeout(() => router.push('/'), 2000)
      } finally {
        setIsProcessing(false)
      }
    }

    processAction()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Account Action Handler
        </h1>

        <div className="mt-4">
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
              <span className="text-gray-600">Processing...</span>
            </div>
          ) : (
            <div
              className={`p-4 rounded ${
                status.isError
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ActionHandler: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActionContent />
    </Suspense>
  )
}

export default ActionHandler
