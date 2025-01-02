export const validateLeaveBalance = (
  availableLeave: number,
  requestedDays: number,
  izinTuru: 'yillik' | 'haftalik'
): {
  isValid: boolean;
  message: string;
  needsExtraLeave: boolean;
} => {
  if (availableLeave <= 0) {
    return {
      isValid: false,
      message: `${izinTuru === 'yillik' ? 'Yıllık' : 'Haftalık'} izin hakkı bulunmamaktadır.`,
      needsExtraLeave: true
    };
  }

  if (requestedDays > availableLeave) {
    return {
      isValid: false,
      message: `Talep edilen ${requestedDays} gün izin, mevcut ${availableLeave} gün izin hakkından fazladır.`,
      needsExtraLeave: true
    };
  }

  return {
    isValid: true,
    message: '',
    needsExtraLeave: false
  };
};