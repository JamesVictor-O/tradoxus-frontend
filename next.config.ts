import type { NextConfig } from "next";

interface WebpackConfig {
	externals: string[];
}

interface WebpackFunction {
	(config: WebpackConfig): WebpackConfig;
}

interface ModuleExports {
	webpack: WebpackFunction;
}

const nextConfig: NextConfig = {
	module: {
		exports: {
			webpack: (config: WebpackConfig): WebpackConfig => {
				config.externals = [...config.externals, '@prisma/client'];
				return config;
			}
		} as ModuleExports
	}
};

export default nextConfig;
