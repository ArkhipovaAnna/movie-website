const isValidIdHepler = (id: string | undefined): boolean =>
    id !== undefined && /^[1-9]\d{0,9}$/.test(id);

export default isValidIdHepler
