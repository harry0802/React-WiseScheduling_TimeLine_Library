// components/WiseScheduling/components/machine/forms/IdleForm.jsx
import React, { memo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { idleSchema } from "../../../configs/validations/machine/machineSchemas";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const IdleForm = ({ machineId, onSubmit, initialData = {} }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(idleSchema),
    defaultValues: {
      // TODO 這邊要調整
      startTime: initialData.startTime || new Date(),
      endTime: initialData.endTime || null,
      note: initialData.note || "",
    },
  });

  const submitForm = useCallback(
    (data) => {
      if (onSubmit) {
        onSubmit({
          machineId,
          status: "IDLE",
          ...data,
        });
      }
    },
    [machineId, onSubmit]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit(submitForm)} sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          待機中狀態資訊
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                label="開始時間"
                value={field.value}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.startTime,
                    helperText: errors.startTime?.message,
                  },
                }}
              />
            )}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="備註"
                multiline
                rows={2}
                error={!!errors.note}
                helperText={errors.note?.message}
              />
            )}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            儲存
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default memo(IdleForm);
