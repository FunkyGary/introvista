export function parseFirestoreErrorCode(errorCode: string): string {
  switch (errorCode) {
    case 'cancelled':
      return '已取消'
    case 'unknown':
      return '未知錯誤'
    case 'invalid-argument':
      return '無效引數'
    case 'deadline-exceeded':
      return '截止時間過早'
    case 'not-found':
      return '找不到'
    case 'already-exists':
      return '已存在'
    case 'permission-denied':
      return '權限被拒絕'
    case 'resource-exhausted':
      return '資源耗盡'
    case 'failed-precondition':
      return '前提條件失敗'
    case 'aborted':
      return '已中止'
    case 'out-of-range':
      return '超出範圍'
    case 'unimplemented':
      return '尚未實作'
    case 'internal':
      return '內部錯誤'
    case 'unavailable':
      return '資料不可用'
    case 'data-loss':
      return '資料遺失'
    case 'unauthenticated':
      return '未驗證'
    default:
      return '未知錯誤'
  }
}
