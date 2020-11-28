import { RequestHandler } from 'express';

type PropType = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

interface Fields {
	[prop: string]: {
		type: PropType;
		required?: boolean;
		minLength?: number;
		maxLength?: number;
		regex?: RegExp;
	};
}

interface Options {
	failStatus?: number;
	failMessage?: string;
	undefinedMessage?: string;
	minLengthMessage?: string;
	maxLengthMessage?: string;
	regexMessage?: string;
}

function validator(fields: Fields, options: Options = {}): RequestHandler {
	const {
		failStatus = 400,
		failMessage = 'Property "[prop]" must be of type "[type]", received "[received]"',
		undefinedMessage = 'Property "[prop]" missing in request body',
		minLengthMessage = 'Property "[prop]" must have a minimum length of [length]',
		maxLengthMessage = 'Property "[prop]" must have a maximum length of [length]',
		regexMessage = 'Property "[prop]" must match regex [regex]',
	} = options;

	return (req, res, next) => {
		for (const field in fields) {
			// Get field options
			const { type, required = true, minLength = 0, maxLength, regex } = fields[
				field
			];

			// Response message formatter
			const formatMessage = (received: string) =>
				failMessage
					.replace(/\[prop\]/g, field)
					.replace(/\[type\]/g, type)
					.replace(/\[received\]/g, received);

			// Check if field is required
			const property = req.body[field];
			if (property === undefined && required) {
				return res.status(failStatus).json({
					status: failStatus,
					message: undefinedMessage.replace(/\[prop\]/g, field),
				});
			} else if (property === undefined) {
				continue;
			}

			// Check if type is null
			if (property === null && type !== 'null') {
				return res.status(400).json({
					status: 400,
					message: formatMessage('null'),
				});
			}

			// Check property type
			const receivedType = typeof property;
			if (
				(type === 'array' && !Array.isArray(property)) ||
				(type !== 'array' && receivedType !== type)
			) {
				return res.status(failStatus).json({
					status: failStatus,
					message: formatMessage(receivedType),
				});
			}

			// String/array only checks
			if (type === 'string' || type === 'array') {
				// Check minimum length
				if (property.length < minLength) {
					return res.status(failStatus).json({
						status: failStatus,
						message: minLengthMessage
							.replace(/\[prop\]/g, field)
							.replace(/\[length\]/g, minLength.toString()),
					});
				}

				// Check maximum length
				if (maxLength && property.length > maxLength) {
					return res.status(failStatus).json({
						status: failStatus,
						message: maxLengthMessage
							.replace(/\[prop\]/g, field)
							.replace(/\[length\]/g, maxLength.toString()),
					});
				}

				// Check regex
				if (regex && !regex.test(property)) {
					return res.status(failStatus).json({
						status: failStatus,
						message: regexMessage
							.replace(/\[prop\]/g, field)
							.replace(/\[regex\]/g, regex.toString()),
					});
				}
			}
		}

		next();
	};
}

export default validator;
