/**
 * @file useEnhancedDialog.test.js
 * @description Custom Hook 測試文件
 * @version 1.0.0
 */

import { renderHook, act } from '@testing-library/react';
import useEnhancedDialog from '../hooks/useEnhancedDialog';
import { MACHINE_STATUS } from '../../../../configs/validations/schedule/constants';

//! =============== Custom Hook 測試 ===============
//* 現代 React 的 Hook 測試更容易編寫和維護

describe('useEnhancedDialog', () => {
  const mockItem = {
    id: '1',
    timeLineStatus: MACHINE_STATUS.IDLE,
    start: '2024-01-01T09:00:00',
    end: '2024-01-01T17:00:00',
  };

  const mockOptions = {
    onSave: jest.fn(),
    onClose: jest.fn(),
    groups: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('應該初始化正確的狀態', () => {
    const { result } = renderHook(() => 
      useEnhancedDialog(mockItem, 'edit', mockOptions)
    );

    expect(result.current.currentStatus).toBe(MACHINE_STATUS.IDLE);
    expect(result.current.error).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
  });

  test('應該正確處理狀態切換', () => {
    const { result } = renderHook(() => 
      useEnhancedDialog(mockItem, 'edit', mockOptions)
    );

    act(() => {
      result.current.handleStatusChange(MACHINE_STATUS.SETUP);
    });

    expect(result.current.currentStatus).toBe(MACHINE_STATUS.SETUP);
  });

  test('應該在提交時調用 onSave', async () => {
    const { result } = renderHook(() => 
      useEnhancedDialog(mockItem, 'edit', mockOptions)
    );

    const formData = {
      start: '2024-01-01T10:00:00',
      end: '2024-01-01T18:00:00',
      product: 'Test Product',
    };

    await act(async () => {
      await result.current.handleSubmit(formData);
    });

    expect(mockOptions.onSave).toHaveBeenCalled();
    expect(mockOptions.onClose).toHaveBeenCalled();
  });

  test('應該處理提交錯誤', async () => {
    const errorOptions = {
      ...mockOptions,
      onSave: jest.fn().mockRejectedValue(new Error('測試錯誤')),
    };

    const { result } = renderHook(() => 
      useEnhancedDialog(mockItem, 'edit', errorOptions)
    );

    const formData = { start: '2024-01-01T10:00:00' };

    await act(async () => {
      await result.current.handleSubmit(formData);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.isSubmitting).toBe(false);
  });

  test('應該清除錯誤', () => {
    const { result } = renderHook(() => 
      useEnhancedDialog(mockItem, 'edit', mockOptions)
    );

    // 手動設置錯誤狀態來測試清除功能
    act(() => {
      result.current.handleStatusChange('INVALID_STATUS');
    });

    expect(result.current.error).toBeTruthy();

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
