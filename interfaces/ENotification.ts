import * as Yup from "yup";

export enum ENotificationType {
	ADMIN = "admin",
	SYSTEM = "system",
}

export enum ENotificationStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
}

export const notificationSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	name: Yup.string().default(""),
	content: Yup.string().default(""),
	url: Yup.string().url().default(""),
	type: Yup.string()
		.oneOf(Object.values(ENotificationType))
		.default(ENotificationType.ADMIN),
	condition: Yup.mixed(),
	create_time: Yup.string().default(""),
	status: Yup.string()
		.oneOf(Object.values(ENotificationStatus))
		.default(ENotificationStatus.ACTIVE),
});

type TENotification = Yup.InferType<typeof notificationSchema>;

export default TENotification;
