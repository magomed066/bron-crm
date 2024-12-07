import { useGetBranches } from '@/entities/branches'
import { useAddEmployeeMutation } from '@/entities/employees'
import { CreateEmployee } from '@/shared/api/services'
import { ModalType } from '@/shared/lib/config'
import { isValid, isValidEmail, requiredValidate } from '@/shared/lib/helpers'
import { useModal } from '@/shared/lib/hooks/use-modal'
import {
	Button,
	Checkbox,
	Flex,
	Grid,
	Loader,
	Select,
	Text,
	TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useMemo } from 'react'

export const AddEmployeeModalFeature = () => {
	const form = useForm<CreateEmployee>({
		mode: 'uncontrolled',
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			password: '',
			branchId: '',
			isAdmin: false,
		},
		validate: {
			firstName: (value) =>
				isValid([requiredValidate('Заполните поле')], value),
			lastName: (value) => isValid([requiredValidate('Заполните поле')], value),
			email: (value) =>
				isValid(
					[
						requiredValidate('Заполните поле'),
						isValidEmail('Введите корректный Email'),
					],
					value,
				),
			phone: (value) => isValid([requiredValidate('Заполните поле')], value),
			password: (value) => isValid([requiredValidate('Заполните поле')], value),
		},
	})

	const { handleClose } = useModal({
		type: ModalType.ADD_EMPLOYEE,
	})

	const { mutate } = useAddEmployeeMutation(() => {
		handleClose()
		notifications.show({
			color: 'green',
			autoClose: 2500,
			title: 'Сотрудники',
			message: 'Сотрудник успешно добавлен',
		})
	})

	const { branches, isFetching } = useGetBranches()

	const mappedBranches = useMemo(() => {
		return branches
			? branches.map((el) => ({ label: el.name, value: String(el.id) }))
			: []
	}, [branches])

	const handleSubmit = form.onSubmit((values) => {
		mutate(values)
	})

	return (
		<form onSubmit={handleSubmit}>
			<Text size="sm" c="secondaryColor">
				Заполните все поля, чтобы добавить сотрудника в систему
			</Text>
			<Grid mt={16}>
				<Grid.Col span={6}>
					<TextInput
						placeholder="Имя"
						key={form.key('firstName')}
						{...form.getInputProps('firstName')}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<TextInput
						placeholder="Фамилия"
						key={form.key('lastName')}
						{...form.getInputProps('lastName')}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<TextInput
						placeholder="Email"
						key={form.key('email')}
						{...form.getInputProps('email')}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<TextInput
						placeholder="Телефон"
						key={form.key('phone')}
						{...form.getInputProps('phone')}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<TextInput
						placeholder="Пароль"
						key={form.key('password')}
						{...form.getInputProps('password')}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Select
						data={mappedBranches}
						placeholder="Филиал"
						disabled={isFetching}
						key={form.key('branchId')}
						{...form.getInputProps('branchId')}
						rightSection={isFetching ? <Loader size="xs" /> : null}
					/>
				</Grid.Col>

				<Grid.Col span={16} mt={8}>
					<Checkbox
						defaultChecked={!form.getValues().isAdmin}
						key={form.key('isAdmin')}
						{...form.getInputProps('isAdmin')}
						label="Cотрудник"
					/>
				</Grid.Col>
			</Grid>

			<Flex align="center" gap={16} mt={16} justify="end">
				<Button
					variant="default"
					type="button"
					onClick={handleClose}
					// disabled={isPending}
				>
					Отменить
				</Button>
				<Button
					bg="primaryColor"
					type="submit"
					// loading={isPending}
					// disabled={isPending}
				>
					Сохранить
				</Button>
			</Flex>
		</form>
	)
}
