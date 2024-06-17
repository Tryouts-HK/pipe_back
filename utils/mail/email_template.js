import sendMail from './nodemailer';

const sender = {
    name: 'Alex',
    position: 'Chief Monitoring Officer',
    organization: 'Election Watch',
    email: "alex@electionwatch.org"
}

// Send a welcome email to new members
export const sendSignupMail = async (member) => {
    const subject = `Welcome to Election Watch!`;
    const content = `<!DOCTYPE html><html><head><title>Welcome to Election Watch!</title></head><body><p>Dear ${member.name ? member.name : "Observer"},</p><p>Thank you for joining Election Watch! We're excited to have you on board. If you need any assistance, please contact us at ${sender.email}. Welcome!</p><p>Best regards,<br>${sender.name}</p></body></html>`;
    await sendMail(member.email, subject, content);
}

// Send a password reset email
export const sendResetMail = async (member, resetLink) => {
    const subject = 'Password Reset Request';
    const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Password Reset Request</title></head><body><p>Dear ${member.name ? member.name : "Observer"},</p><p>To reset your password, please click the following link: <a href="${resetLink}">Reset Password</a></p><p>If you did not request a password reset, please ignore this email.</p><p>If you need further assistance, feel free to contact us.</p><p>Thank you,<br>${sender.name}<br>${sender.position}<br>${sender.organization}</p></body></html>`;
    await sendMail(member.email, subject, content);
}

// Confirm that the password has been reset
export const sendConfirmResetMail = async (member) => {
    const subject = 'Your Password Has Been Changed';
    const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Password Changed</title></head><body><p>Dear ${member.name ? member.name : "Observer"},</p><p>Your password has been successfully changed. If you did not request this change, please contact us immediately.</p><p>Thank you,<br>${sender.name}<br>${sender.position}<br>${sender.organization}</p></body></html>`;
    await sendMail(member.email, subject, content);
}

// Send an invitation to a new observer
export const composeObserverInvitationMail = (invitee, invitedObserver) => {
    const subject = "Join Our Election Monitoring Team!";
    const content = `<!DOCTYPE html><html><head><title>Join Our Team!</title></head><body><p>Hello ${invitedObserver},</p><p>${invitee} has invited you to join our election monitoring team.</p><p>We believe your participation will make a significant impact.</p><p>Looking forward to working with you!</p><p>Best regards,<br>${sender.name}<br>${sender.position}<br>${sender.organization}</p></body></html>`;
    return {
        subject,
        content,
    };
}

// Send a thank you email for contacting support
export const sendContactEmail = async (contact) => {
    const subject = 'Thank You for Contacting Us';
    const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Contact Acknowledgment</title></head><body><p>Dear ${contact.name ? contact.name : "Observer"},</p><p>Thank you for reaching out! Our team will get back to you soon.</p><p>Best regards,<br>${sender.name}<br>${sender.position}<br>${sender.organization}</p></body></html>`;
    await sendMail(contact.email, subject, content);
}

// Notify user of account deactivation
export const sendUserDeactivateAccount = async (member) => {
    const subject = 'Account Deactivation Notice';
    const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Account Deactivation</title></head><body><p>Dear ${member.name ? member.name : "Observer"},</p><p>Your account has been deactivated. Please contact us to request access again.</p><p>Thank you,<br>${sender.name}<br>${sender.position}<br>${sender.organization}</p></body></html>`;
    await sendMail(member.email, subject, content);
}
