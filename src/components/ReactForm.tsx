import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';

type FormProps = {
	username: string;
	password: string;
	email: string;
	gender: string;
	social: {
		facebook: string;
		twitter: string;
	};
	options?: { name: string }[];
};

export const ReactForm = () => {
	const yupSchema = yup.object({
		username: yup.string().required('Please Enter the username'),
		password: yup.string().required('Password is Required'),
		email: yup
			.string()
			.email('Please Enter Correct email')
			.matches(/([a-z]+)(\d+)(@)([a-z]{3,5})(.)([a-z]{2,3})/)
			.required('Email is required'),
		gender: yup.string().required('Please choose gender'),
		social: yup.object().shape({
			facebook: yup
				.string()
				.url('Invalid Facebook URL')
				.required('Facebook URL is required'),
			twitter: yup
				.string()
				.url('Invalid Twitter URL')
				.required('Twitter URL is required'),
		}),
		options: yup
			.array()
			.of(
				yup.object().shape({
					name: yup.string().required('Add name'),
				})
			)
			.min(1, 'At least one option is required')
			.optional(),
	});

	const form = useForm<FormProps>({
		defaultValues: {
			username: '',
			password: '',
			email: '',
			gender: '',
			social: {
				facebook: '',
				twitter: '',
			},
			options: [{ name: '' }],
		},
		resolver: yupResolver(yupSchema),
		mode: 'all',
	});

	const { register, control, handleSubmit, formState } = form;
	const { fields, remove, append } = useFieldArray({
		name: 'options',
		control,
	});

	const { errors, dirtyFields } = formState;

	const onSubmit = (data: FormProps) => {
		console.log(data);
	};
	return (
		<div>
			<form
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					gap: '20px',
				}}
				noValidate
				onSubmit={handleSubmit(onSubmit)}
			>
				<label htmlFor="username">UserName</label>
				<input type="text" id="userName" {...register('username')} />
				<p className="newError">{errors.username?.message}</p>
				<label htmlFor="password">Password</label>
				<input type="text" id="password" {...register('password')} />
				<label htmlFor="email">Email</label>
				<p className="newError">{errors.password?.message}</p>

				<input type="text" id="email" {...register('email')} />
				<p className="newError">{errors.email?.message}</p>

				<label htmlFor="gender">Gender</label>

				<select id="gender" {...register('gender')}>
					<option value="none">Choose Gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
				<p className="newError">{errors.gender?.message}</p>

				<label htmlFor="facebook">Facebook</label>
				<input type="text" id="facebook" {...register('social.facebook')} />
				<p className="newError">{errors.social?.facebook?.message}</p>

				<label htmlFor="twitter">Twitter</label>
				<input type="text" id="twitter" {...register('social.twitter')} />
				<p className="newError">{errors.social?.twitter?.message}</p>

				<div>
					{fields.map((field, index) => (
						<div key={field.id}>
							<input
								type="text"
								{...register(`options.${index}.name` as const)}
							/>
							{index !== 0 && (
								<button type="button" onClick={() => remove(index)}>
									Remove
								</button>
							)}
						</div>
					))}
					<button type="button" onClick={() => append({ name: '' })}>
						Add Field
					</button>
				</div>
				<button disabled={Object.keys(dirtyFields).length === 0}>
					Submit Form
				</button>
			</form>
			<DevTool control={control} />
		</div>
	);
};
