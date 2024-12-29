// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// React Query 클라이언트 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 실패시 재시도 횟수
      staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선한 상태로 유지
      gcTime: 1000 * 60 * 5, // 사용하지 않는 캐시 데이터 유지 시간
      refetchOnWindowFocus: false, // 윈도우 포커스시 자동 리페치 비활성화
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} /> {/* 개발 시 쿼리 상태를 볼 수 있는 devtools */}
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
)