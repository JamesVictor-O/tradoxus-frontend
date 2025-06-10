import type { Benefit } from "@/lib/types/web3.type";

export const BenefitItem: React.FC<Benefit> = ({
	title,
	description,
	icon,
	bgColor,
}) => (
	<div className="flex items-start gap-4">
		<div className={`${bgColor} p-2 rounded-lg`}>{icon}</div>
		<div>
			<h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
			<p className="text-gray-600 dark:text-gray-400">{description}</p>
		</div>
	</div>
);
