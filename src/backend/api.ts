// istanbul ignore file -- no coverage, since we would need a running backend for that

import { EintragResource, ProtokollResource } from "../Resources";
import { LoginInfo } from "../components/LoginContext";
import { ErrorWithHTML, fetchWithErrorHandling } from "./fetchWithErrorHandling";
import { eintraege, protokolle } from "./testdata";

export async function getAlleProtokolle(): Promise<ProtokollResource[]> {
    if (process.env.REACT_APP_REAL_FETCH !== 'true') {
        await new Promise(r => setTimeout(r, 700));
        return Promise.resolve(protokolle);
    } else {
        // Implementieren Sie hier einen echten Fetch-Call,
        // um die Daten tatsächlich von Ihrem Server zu laden. 
        const res = await fetchWithErrorHandling(`${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/alle`, { credentials: "include" as RequestCredentials })
        if (!res.ok) {
            throw new Error("response error");
        }
        return await res.json();
    }
}

export async function getAlleEintraege(protokollId: string): Promise<EintragResource[]> {
    if (process.env.REACT_APP_REAL_FETCH !== 'true') {
        await new Promise(r => setTimeout(r, 700));
        return Promise.resolve(eintraege);
    } else {
        // Implementieren Sie hier einen echten Fetch-Call,
        // um die Daten tatsächlich von Ihrem Server zu laden.
        const res = await fetchWithErrorHandling(`${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/${protokollId}/eintraege`, { credentials: "include" as RequestCredentials })
        if (!res.ok) {
            throw new Error("response error");
        }
        return await res.json();
    }
}

export async function getProtokoll(protokollId: string): Promise<ProtokollResource> {
    if (process.env.REACT_APP_REAL_FETCH !== 'true') {
        await new Promise(r => setTimeout(r, 700));
        const prot = protokolle.find(p => p.id === protokollId);
        if (!prot) {
            throw new Error(`protocol not found`);
        }
        return prot;
    } else {
        // Implementieren Sie hier einen echten Fetch-Call,
        // um die Daten tatsächlich von Ihrem Server zu laden. 
        const res = await fetchWithErrorHandling(`${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/${protokollId}`, { credentials: "include" as RequestCredentials })
        if (!res.ok) {
            throw new Error("response error");
        }
        return await res.json();
    }
}
export async function getEintrag(eintragId: string): Promise<EintragResource> {
    if (process.env.REACT_APP_REAL_FETCH !== 'true') {
        await new Promise(r => setTimeout(r, 700));
        const eintrag = eintraege.find(e => e.id === eintragId);
        if (!eintrag) {
            throw new Error(`eintrag not found`);
        }
        return eintrag;
    } else {
        // Implementieren Sie hier einen echten Fetch-Call,
        // um die Daten tatsächlich von Ihrem Server zu laden. 
        const res = await fetchWithErrorHandling(`${process.env.REACT_APP_API_SERVER_URL}/api/eintrag/${eintragId}`, { credentials: "include" as RequestCredentials })
        if (!res.ok) {
            throw new Error("response error");
        }
        return await res.json();
    }
}

export async function postLogin(name: string, password: string) {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/login`;

    const response = await fetchWithErrorHandling(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify({ name, password })
    });
    if (response.ok) {
        const loginInfo: LoginInfo = await response.json();
        return loginInfo;
    }
    if (response.status === 401) {
        throw new Error("Invalid credentials");
    }
    throw new Error(`Error connecting to ${process.env.REACT_APP_API_SERVER_URL}: ${response.statusText}`);
}

export async function deleteLogin(): Promise<void> {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/login`;
    const response = await fetchWithErrorHandling(url, { method: "DELETE", credentials: "include" as RequestCredentials });
    if (response.ok) {
        return;
    }
    throw new Error(`Error logging out, status: ${response.status}`);
}

export async function getLogin() {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/login`;

    const response = await fetchWithErrorHandling(url, {
        method: "GET",
        credentials: "include" as RequestCredentials,
    });
    if (response.ok) {
        const loginInfo: LoginInfo = await response.json();
        return loginInfo;
    }
    if (response.status === 401) {
        throw new Error("Invalid credentials");
    }
    throw new Error(`Error connecting to ${process.env.REACT_APP_API_SERVER_URL}: ${response.statusText}`);
}

export async function postProtokoll(protokoll: ProtokollResource) {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/protokoll`;

    const response = await fetchWithErrorHandling(url, {
        method: "POST",
        // Mit Hilfe von Dimitrey Riffel
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify({
            patient: protokoll.patient,
            ersteller: protokoll.ersteller,
            datum: protokoll.datum,
            public: protokoll.public,
            closed: protokoll.closed
        })
    });
    return await response.json();
}
export async function putProtokoll(protokoll: ProtokollResource) {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/${protokoll.id}`;

    const response = await fetchWithErrorHandling(url, {
        method: "PUT",
        // Mit Hilfe von Dimitrey Riffel
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify({
            id: protokoll.id,
            patient: protokoll.patient,
            ersteller: protokoll.ersteller,
            datum: protokoll.datum,
            public: protokoll.public,
            closed: protokoll.closed
        })
    });
    return await response.json();
}

export async function deleteProtokoll(protokollId: string) {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/protokoll/${protokollId}`;
    const response = await fetchWithErrorHandling(url, { method: "DELETE", credentials: "include" as RequestCredentials });
    if (response.ok) {
        return;
    }
    throw new Error(`Error deleting protocol, status: ${response.status}`);
}

export async function postEintrag(eintrag: EintragResource) {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/eintrag`;
    try {


        const response = await fetchWithErrorHandling(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include" as RequestCredentials,
            body: JSON.stringify({
                protokoll: eintrag.protokoll,
                ersteller: eintrag.ersteller,
                getraenk: eintrag.getraenk,
                menge: eintrag.menge,
                kommentar: eintrag.kommentar
            })
        });
        return await response.json();
        // Mit Hilfe von Dimitrey Riffel
    } catch (err) {
        const status = (err as any).status;
        if (status === 400) {
            throw new Error("protocol is closed");
        }
    }
}

export async function deleteEintrag(eintragId: string) {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/eintrag/${eintragId}`;
    const response = await fetchWithErrorHandling(url, { method: "DELETE", credentials: "include" as RequestCredentials });
    if (response.ok) {
        return;
    }
    throw new Error(`Error deleting eintrag, status: ${response.status}`);
}

export async function putEintrag(eintrag: EintragResource) {
    const url = `${process.env.REACT_APP_API_SERVER_URL}/api/eintrag/${eintrag.id}`;

    const response = await fetchWithErrorHandling(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify({
            id: eintrag.id,
            protokoll: eintrag.protokoll,
            ersteller: eintrag.ersteller,
            getraenk: eintrag.getraenk,
            menge: eintrag.menge,
            kommentar: eintrag.kommentar
        })
    });
    return await response.json();
}