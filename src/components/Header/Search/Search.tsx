type SearchProps = {
    placeholder: string
    value: string
    setValue: (value: string) => void
    keyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const Search= ({ placeholder, value, setValue, keyDown }: SearchProps) => {
    return (
        <div className="w-full">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={keyDown}
                className="w-full h-14 md:h-10 px-4 text-lg md:text-base border border-gray-300 rounded-lg focus:outline-none"
            />
        </div>
    )
}