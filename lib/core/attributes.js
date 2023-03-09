import { Subject, takeUntil } from 'rxjs';
export class AbstractAttributes {
    _unsubscribe;
    _map;
    _changesNotifier;
    constructor(map) {
        this._unsubscribe = new Subject();
        this._map = map ?? {};
        this._changesNotifier = new Subject();
    }
    get _changes() {
        return this._changesNotifier.pipe(takeUntil(this._unsubscribe));
    }
    get value() {
        return this._map;
    }
    get(name) {
        if (name in this._map) {
            return this._map[name];
        }
        return null;
    }
    set(name, value) {
        if (value !== null) {
            const change = { name, value };
            this._map[change.name] = change.value;
            this._changesNotifier.next([change]);
        }
        else {
            this.remove(name);
        }
    }
    getBoolean(name) {
        return name in this._map;
    }
    setBoolean(name, value = true) {
        if (value) {
            this.set(name, '');
        }
        else {
            this.remove(name);
        }
    }
    getNumber(name) {
        const value = this.get(name);
        if (value !== null) {
            return Number(value);
        }
        return null;
    }
    setNumber(name, value) {
        if (value !== null) {
            this.set(name, value.toString());
        }
        else {
            this.remove(name);
        }
    }
    getDate(name) {
        const value = this.get(name);
        if (value !== null) {
            return new Date(value);
        }
        return null;
    }
    setDate(name, value) {
        if (value !== null) {
            this.set(name, value.toISOString().substring(0, 10));
        }
        else {
            this.remove(name);
        }
    }
    remove(name) {
        if (name in this._map) {
            const change = { name, value: undefined };
            delete this._map[change.name];
            this._changesNotifier.next([change]);
        }
    }
    patch(attributes) {
        const changesList = Object.keys(attributes).map((name) => {
            const change = {
                name,
                value: attributes[name],
            };
            this._map[change.name] = change.value;
            return change;
        });
        this._changesNotifier.next(changesList);
    }
    _dispose() {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }
}
export class Attributes extends AbstractAttributes {
    get changes() {
        return this._changes;
    }
    dispose() {
        super._dispose();
    }
}
//# sourceMappingURL=attributes.js.map