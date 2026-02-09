const DB_NAME = 'kpop_idol_media';
const DB_VERSION = 1;
const STORE_NAME = 'media';

interface MediaRecord {
  id: string;
  blob: Blob;
  type: string;
  timestamp: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

export async function saveMedia(blob: Blob, type: string): Promise<string> {
  const db = await openDB();
  const id = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const record: MediaRecord = {
    id,
    blob,
    type,
    timestamp: Date.now(),
  };
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(record);
    
    request.onsuccess = () => resolve(id);
    request.onerror = () => reject(request.error);
  });
}

export async function loadMedia(id: string): Promise<Blob | null> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);
    
    request.onsuccess = () => {
      const record = request.result as MediaRecord | undefined;
      resolve(record ? record.blob : null);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function deleteMedia(id: string): Promise<void> {
  const db = await openDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export function createMediaUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}

export function revokeMediaUrl(url: string): void {
  URL.revokeObjectURL(url);
}
