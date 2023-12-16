// Client side utiltiy functions to access the DB

export async function fetchAllConfig() {
    const resp = await fetch('/api/getAllConfig');
    if (resp.ok) {
        const json = await resp.json();
        return json.body;
    }
    return [];
}

export async function fetchConfigValue(name:string): Promise<string> {
    const resp = await fetch(`/api/getConfig?name=${name}`);
    if (resp.ok) {
        const json = await resp.json();
        return json.body;
    }
    return '';
}
