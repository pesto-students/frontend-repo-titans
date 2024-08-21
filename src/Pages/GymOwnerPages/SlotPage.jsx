import { TimePicker, DatePicker, Space } from "antd";
import React, { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdOutlineAddBox } from "react-icons/md";
import dayjs from "dayjs";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Slot = () => {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      times: daysOfWeek.map(() => []), // Initialize empty arrays for each day
      selectedDays: Array(daysOfWeek.length).fill(false),
    },
  });

  const format = "HH:mm";
  const [selectedDates, setSelectedDates] = useState([]);

  const selectedDays = watch("selectedDays");
  const times = watch("times");

  const handleCheckboxChange = useCallback(
    (index) => {
      const newSelectedDays = [...selectedDays];
      newSelectedDays[index] = !newSelectedDays[index];
      setValue("selectedDays", newSelectedDays);
    },
    [selectedDays, setValue]
  );

  const handleDateChange = useCallback(
    (date, dateString) => {
      if (date && !selectedDates.includes(dateString)) {
        setSelectedDates([...selectedDates, dateString]);
      }
    },
    [selectedDates]
  );

  const handleRemoveDate = useCallback(
    (dateToRemove) => {
      setSelectedDates(selectedDates.filter((date) => date !== dateToRemove));
    },
    [selectedDates]
  );

  const addTimeSlot = (dayIndex) => {
    console.log(dayIndex);
    // handleCheckboxChange(dayIndex);
    const newTimes = [...times];
    if (!newTimes[dayIndex]) {
      newTimes[dayIndex] = [];
    }
    newTimes[dayIndex].push({ from: "", to: "" });
    setValue("times", newTimes);
  };

  const removeTimeSlot = (dayIndex, intervalIndex) => {
    const newTimes = [...times];
    newTimes[dayIndex].splice(intervalIndex, 1);
    if (newTimes[dayIndex].length === 0) {
      newTimes[dayIndex] = undefined;
    }
    setValue("times", newTimes);
  };

  const onSubmit = (data) => {
    console.log("Data to send:", {
      times: data.times,
      blockedDates: selectedDates,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[35rem] my-6">
      <div className="flex flex-col justify-center mx-4 md:flex-row md:space-x-12 md:px-16 shadow-lg">
        {/* Time Container */}
        <div className="flex flex-col justify-center p-4">
          <h2 className="mb-2 font-semibold text-2xl">Slots</h2>
          <p className="mb-4 text-gray-500 text-base">
            Set available workout time slots for your clients
          </p>
          {daysOfWeek.map((day, index) => (
            <div key={day} className="flex flex-col space-y-2 md:flex-row my-2">
              {/* Check box */}
              <Controller
                name={`selectedDays[${index}]`}
                control={control}
                render={({ field }) => (
                  <div className="flex items-center mb-2 md:space-x-2">
                    <input
                      type="checkbox"
                      id={day}
                      {...field}
                      onChange={() => handleCheckboxChange(index)}
                      className="mr-2"
                    />
                    <label htmlFor={day} className="w-24 text-base text-white">
                      {day}
                    </label>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => addTimeSlot(index)}
                    >
                      <MdOutlineAddBox />
                    </button>
                  </div>
                )}
              />

              {/* Time Pickers */}
              <div className="flex flex-col space-y-2">
                {times[index]?.map((time, timeIndex) => (
                  <div
                    key={timeIndex}
                    className="flex flex-col items-end space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center sm:ml-4"
                  >
                    <Controller
                      name={`times[${index}][${timeIndex}].start`}
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          format={format}
                          className="w-full rounded-none bg-wwbg text-white focus:outline-none focus:border-red-500 border border-gray-600"
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name={`times[${index}][${timeIndex}].end`}
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          format={format}
                          className="w-full rounded-none bg-wwbg text-white focus:outline-none focus:border-red-500 border border-gray-600"
                          {...field}
                        />
                      )}
                    />
                    <button
                      type="button"
                      className="text-red-500 mt-2"
                      onClick={() => removeTimeSlot(index, timeIndex)}
                    >
                      <IoMdCloseCircleOutline className="text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Block Date Container */}
        <div className="flex justify-center">
          <div className="p-4">
            <h2 className="mb-2 font-semibold text-2xl">Block Dates</h2>
            <p className="mb-4 text-gray-500 text-base">
              Add dates when you will be unavailable to take calls
            </p>

            {/* Date Picker */}
            <div className="flex flex-col items-start space-y-2 my-4">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      className="w-full px-3 py-2 rounded-none bg-wwbg !text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-red-500 hover:bg-wwbg"
                      style={{ width: "100%" }}
                      onChange={handleDateChange}
                    />
                  )}
                />
              </Space>
            </div>

            {/* Selected Dates List */}
            {selectedDates.length > 0 && (
              <div className="my-4">
                <h3 className="mb-2 text-lg">Selected Dates</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  {selectedDates.map((date, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-red-50">
                        {dayjs(date).format("YYYY-MM-DD")}
                      </span>
                      <button
                        className="text-red-500"
                        onClick={() => handleRemoveDate(date)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="button"
              className="w-full md:w-40 px-4 bg-wwred py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slot;
