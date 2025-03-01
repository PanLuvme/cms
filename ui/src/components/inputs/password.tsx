import { defineComponent, ref } from 'vue';
import {
    InputProps,
    InputWrapper,
} from '@bcms/selfhosted-ui/components/inputs/_wrapper';
import { Icon } from '@bcms/selfhosted-ui/components/icon';

export const PasswordInput = defineComponent({
    props: {
        ...InputProps,
        value: String,
        placeholder: String,
        disabled: Boolean,
        readonly: {
            type: Boolean,
            default: false,
        },
    },
    emits: {
        input: (value: string) => {
            return value;
        },
        enter: (_?: unknown) => {
            return _;
        },
        'update:modelValue': (value: string) => {
            return value;
        },
    },
    setup(props, ctx) {
        const showRef = ref(false);
        function inputHandler(event: Event) {
            const element = event.target as HTMLInputElement;
            if (!element) return;
            ctx.emit('update:modelValue', element.value);
            ctx.emit('input', element.value);
        }
        return () => {
            return (
                <InputWrapper
                    id={props.id}
                    class={props.class}
                    label={props.label}
                    description={props.description}
                    error={props.error}
                >
                    <div
                        class={`flex ${
                            props.error
                                ? 'border border-red hover:border-red focus-within:border-red'
                                : ''
                        }`}
                    >
                        <input
                            id={props.id}
                            class={`relative block w-full bg-white border rounded-3.5 transition-all duration-300 shadow-none font-normal not-italic text-base leading-tight -tracking-0.01 text-dark h-11 py-0 px-4.5 outline-none placeholder-grey placeholder-opacity-100 pt-3 pb-[9px] pl-4.5 resize-none top-0 left-0 overflow-hidden hover:shadow-input focus-within:shadow-input ${
                                props.error
                                    ? 'border-red hover:border-red focus-within:border-red pr-17.5'
                                    : 'pr-[35px]'
                            } ${
                                props.error
                                    ? ''
                                    : 'border-grey hover:border-grey hover:border-opacity-50 focus-within:border-grey focus-within:border-opacity-50'
                            } ${
                                props.disabled
                                    ? 'cursor-not-allowed opacity-40 shadow-none border-grey'
                                    : 'cursor-auto'
                            } dark:bg-darkGrey dark:text-light`}
                            placeholder={props.placeholder}
                            value={props.value}
                            type={showRef.value ? 'text' : 'password'}
                            disabled={props.disabled}
                            onChange={inputHandler}
                            onKeyup={(event) => {
                                inputHandler(event);
                                if (event.key === 'Enter') {
                                    ctx.emit('enter');
                                }
                            }}
                            readonly={props.readonly}
                        />
                        <button
                            class={`absolute top-3 ${
                                props.error ? 'right-10.5' : 'right-3'
                            }`}
                            type="button"
                            disabled={props.disabled}
                            onClick={() => {
                                showRef.value = !showRef.value;
                            }}
                        >
                            {showRef.value ? (
                                <Icon
                                    src="/eye/show"
                                    class="w-5 h-5 m-auto fill-current text-grey"
                                />
                            ) : (
                                <Icon
                                    src="/eye/hide"
                                    class="w-5 h-5 m-auto stroke-current text-grey"
                                />
                            )}
                        </button>
                    </div>
                </InputWrapper>
            );
        };
    },
});
