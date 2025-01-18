

export interface NewUserRequestBody {
    userName: string;
    phoneNumber: string;
    photo?: string;
    gender: string;
    dob: Date;
    otp ?: string
};

