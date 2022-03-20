// import React from 'react';
import { Position, Toaster } from "@blueprintjs/core";
 
/** Singleton toaster instance. Create separate instances for different options. */
export const ErrorNotification = Toaster.create({
    className: "errors-toaster",
    position: Position.TOP,
    maxToasts: 5,

});

