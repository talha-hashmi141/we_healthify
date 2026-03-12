import { useState, useCallback } from "react";

export function useForm(initialValues, zodSchema) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      e.preventDefault();
      setErrors({});

      let parsed = values;
      if (zodSchema) {
        const result = zodSchema.safeParse(values);
        if (!result.success) {
          const fieldErrors = {};
          result.error.issues.forEach((issue) => {
            const field = issue.path[0];
            if (!fieldErrors[field]) fieldErrors[field] = issue.message;
          });
          setErrors(fieldErrors);
          return;
        }
        parsed = result.data;
      }

      setLoading(true);
      try {
        await onSubmit(parsed);
      } catch (err) {
        setErrors({ general: err.message || "Something went wrong" });
      } finally {
        setLoading(false);
      }
    },
    [values, zodSchema]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return { values, errors, loading, handleChange, handleSubmit, reset, setErrors };
}
