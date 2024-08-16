'use client';

import React from "react";
import { InlineWidget } from "react-calendly";

export default function Appointment() {

    return (
        <div>
            <div className="pt-20 overflow-hidden">
                <div className="Appointment">
                    <InlineWidget url="https://calendly.com/shepherdtheweddingplanner" />
                </div>
            </div>
        </div>
    );
}
