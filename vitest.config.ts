/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
	test: {
		include: [
			'**/tests/**/?(*.)+(spec|test).ts?(x)'
		]
	},
})