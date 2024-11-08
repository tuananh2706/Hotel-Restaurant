import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { vi } from "date-fns/locale";
import { Box, Typography } from "@mui/material";

function DateRangePicker({
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
}) {
  const today = new Date();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={vi}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">Chọn ngày check-in</Typography>
        <DateCalendar
          value={checkInDate}
          onChange={(newDate) => {
            onCheckInChange(newDate);
            onCheckOutChange(null); // Đặt lại ngày check-out khi chọn lại check-in
          }}
          shouldDisableDate={(date) => date < today}
        />

        {checkInDate && (
          <>
            <Typography variant="h6">Chọn ngày check-out</Typography>
            <DateCalendar
              value={checkOutDate}
              onChange={onCheckOutChange}
              shouldDisableDate={(date) => date <= checkInDate}
            />
          </>
        )}
      </Box>
    </LocalizationProvider>
  );
}

export default DateRangePicker;
