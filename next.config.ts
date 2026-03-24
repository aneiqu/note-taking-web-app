import type { NextConfig } from "next";

type SvgRule = {
  test?: RegExp;
  issuer?: unknown;
  resourceQuery?: { not?: RegExp[] };
  exclude?: RegExp;
};

const nextConfig: NextConfig = {
  webpack: (config) => {
    const rules = config.module.rules as SvgRule[];

    const fileLoaderRule = rules.find(
      (rule: SvgRule) => rule.test instanceof RegExp && rule.test.test(".svg"),
    );

    if (!fileLoaderRule) {
      throw new Error("Default SVG rule not found");
    }

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not ?? []), /url/] },
        use: ["@svgr/webpack"],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
