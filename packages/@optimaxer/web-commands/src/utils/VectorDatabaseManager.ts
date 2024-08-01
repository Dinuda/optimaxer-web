/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

export class VectorDatabaseManager {
    /**
     * getAllVersionedDBNames
     * @param baseName - Base name of the IndexedDB databases.
     * @returns Promise<string[]>
     * 
     * This function retrieves all versioned IndexedDB database names that start with the specified base name.
     */
    static async getAllVersionedDBNames(baseName: string): Promise<string[]> {
        // Get all IndexedDB databases
        const dbs = await window.indexedDB.databases();
        const versionedDBNames = dbs
            .map(db => db.name)
            .filter(name => name && name.startsWith(baseName))
            .map(name => name!);
        return versionedDBNames;
    }

    /**
     * getLatestVersionedDBName
     * @param baseName - Base name of the IndexedDB databases.
     * @returns Promise<string>
     * 
     * This function retrieves the latest versioned IndexedDB database name that starts with the specified base name.
     */
    static async getLatestVersionedDBName(baseName: string): Promise<string> {
        const versionedDBNames = await this.getAllVersionedDBNames(baseName);
        if (versionedDBNames.length === 0) return `${baseName}_1.0.0`;
    
        const latestVersion = versionedDBNames
            .map(name => name.replace(`${baseName}_`, ''))
            .sort((a, b) => {
                const [aMajor, aMinor, aPatch] = a.split('.').map(Number);
                const [bMajor, bMinor, bPatch] = b.split('.').map(Number);
                if (aMajor !== bMajor) return bMajor - aMajor;
                if (aMinor !== bMinor) return bMinor - aMinor;
                return bPatch - aPatch;
            })[0];
        return `${baseName}_${latestVersion}`;
    }
}
