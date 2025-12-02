import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import seedLocalData from '@/dev/seedLocal';
import { USE_LOCAL_AUTH } from '@/api/config';

// If running in local-auth development mode and no local users exist, seed test data.
try {
	if (typeof window !== 'undefined') {
		// expose for manual triggering from DevTools
		// @ts-ignore
		window.__seedLocalData = seedLocalData;
		if (USE_LOCAL_AUTH) {
			const has = !!localStorage.getItem('localUsers');
			// eslint-disable-next-line no-console
			console.info('seedLocalData: USE_LOCAL_AUTH=', USE_LOCAL_AUTH, 'localUsers exists=', has);
			if (!has) {
				seedLocalData();
				// eslint-disable-next-line no-console
				console.info('seedLocalData: seeded localUsers');
			}
		}
	}
} catch (e) {
	// swallow errors during seed
}

createRoot(document.getElementById("root")!).render(<App />);
