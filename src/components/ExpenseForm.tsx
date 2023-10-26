import { categories } from "../App";
import { useForm } from "react-hook-form";

interface FormData {
  description: string;
  amount: number;
  category: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  return (
    <form
      className="mb-5"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          id="description"
          type="text"
          className="form-control"
          {...register("description", {
            required: true,
            minLength: 3,
            maxLength: 50,
          })}
        />
        {errors.description?.type === "required" && (
          <p className="text-danger">A description is required</p>
        )}
        {errors.description?.type === "minLength" && (
          <p className="text-danger">
            Description needs to be atleast 3 characters
          </p>
        )}
        {errors.description?.type === "maxLength" && (
          <p className="text-danger">
            Description can be no longer than 50 characters
          </p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          className="form-control"
          {...register("amount", { required: true, min: 0.01, max: 100_000 })}
        />
        {errors.amount?.type === "required" && (
          <p className="text-danger">An amount is required</p>
        )}
        {errors.amount?.type === "min" && (
          <p className="text-danger">Amount must be atleast $0.01</p>
        )}
        {errors.amount?.type === "max" && (
          <p className="text-danger">Amount can be no greater than $100,000</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          className="form-select"
          {...register("category", { required: true })}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category?.type === "required" && (
          <p className="text-danger">A category selection is required</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
