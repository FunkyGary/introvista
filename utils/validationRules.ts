export const stringValidation = {
  required: 'This field is required',
  validate: (value: unknown) => typeof value === 'string' || 'Must be a string',
}

export const numberValidation = {
  required: '此欄位必填',
  min: {
    value: 0,
    message: '數值必須大於 0',
  },
}

export const imageValidation = {
  required: '請上傳圖片',
  validate: (value: File[] | null) => {
    if (!value || value.length === 0) return '請上傳圖片'
    return true
  },
}

export const FileValidation = {
  required: '請上傳檔案',
  validate: (value: File[] | null) => {
    if (!value || value.length === 0) return '請上傳檔案'
    return true
  },
}
