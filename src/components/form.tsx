import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
	userName: string;
	email: string;
	channel: string;
	social: {
		twitter: string;
		facebook: string;
	};
	phoneNumber: {
		number: string;
	}[];
};

export const Form = () => {
	// Form object contains all the methods that hook form returns //
	const form = useForm<FormValues>({
		defaultValues: {
			userName: 'Batman',
			email: '',
			channel: '',
			social: {
				twitter: '',
				facebook: '',
			},
			phoneNumber: [{ number: '' }],
		},
	});

	//Register method is one of the methods that form returns used to register a field for that particular form input
	//We need to pass the name attribute in register to register that field
	const { register, control, handleSubmit, formState, watch } = form;

	const { errors } = formState;

	//handleSubmit is a function that is destructured and use to submit the form and it expects a handlerFunction in that

	const onSubmit = (data: FormValues) => {
		console.log('submitted', data);
	};

	//useFieldArray is used for handling dynamic field addition in react-hook-form

	const { fields, append, remove } = useFieldArray({
		name: 'phoneNumber',
		control,
	});

	return (
		<div style={{ width: '100%' }}>
			<form
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					gap: '20px',
				}}
				onSubmit={handleSubmit(onSubmit)}
				noValidate
			>
				<label htmlFor="userName">UserName</label>
				<input
					{...register('userName', {
						required: {
							value: true,
							message: 'User Name is required',
						},
						disabled: !watch('channel'),
					})}
					type="text"
					id="userName"
				/>
				<p className="error">{errors.userName?.message}</p>
				<label htmlFor="email">Email</label>
				<input
					{...register('email', {
						pattern: {
							value: /([a-z]+)(\d+)(@)([a-z]{3,5})(.)([a-z]{2,3})/,
							message: 'Incorrect Email id',
						},
					})}
					type="text"
					id="email"
				/>
				<p className="error">{errors.email?.message}</p>
				<label htmlFor="channel">Channel</label>
				<input {...register('channel')} type="text" id="channel" />
				<p className="error">{errors.channel?.message}</p>

				<label htmlFor="twitter">twitter</label>
				<input {...register('social.twitter')} type="text" id="twitter" />
				<p className="error">{errors.channel?.message}</p>

				<label htmlFor="facebook">facebook</label>
				<input {...register('social.facebook')} type="text" id="facebook" />
				<p className="error">{errors.channel?.message}</p>
				<button>Submit</button>
				<div>
					<label>List of Phone Number</label>
					<div>
						{fields.map((field, fieldIndex) => {
							return (
								<div key={field.id}>
									<input
										type="text"
										{...register(`phoneNumber.${fieldIndex}.number` as const)}
									/>
									{fieldIndex !== 0 && (
										<button onClick={() => remove(fieldIndex)}>Remove</button>
									)}
								</div>
							);
						})}
						<button onClick={() => append({ number: '' })}>
							Add New Phone
						</button>
					</div>
				</div>
			</form>
			<DevTool control={control} />
		</div>
	);
};
