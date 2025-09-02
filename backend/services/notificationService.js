const nodemailer = require('nodemailer');

class NotificationService {
  constructor() {
    this.emailTransporter = null;
    this.initializeEmailService();
  }

  // Initialize email service
  async initializeEmailService() {
    try {
      if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        this.emailTransporter = nodemailer.createTransporter({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT || 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        // Verify connection
        await this.emailTransporter.verify();
        console.log('Email service initialized successfully');
      } else {
        console.log('Email service not configured - notifications will be logged only');
      }
    } catch (error) {
      console.error('Failed to initialize email service:', error.message);
    }
  }

  // Send battle notification
  async sendBattleNotification(battle, participants) {
    const message = this.createBattleMessage(battle, participants);
    const recipients = participants.map(p => p.contact).filter(contact => 
      contact && contact.includes('@')
    );

    if (recipients.length > 0) {
      await this.sendEmail(recipients, 'New Battle Alert! 🎮', message);
    }

    // Log notification
    console.log(`Battle notification sent to ${recipients.length} participants`);
    console.log(`Battle: ${battle.type} - ${battle.description}`);
    
    return {
      success: true,
      recipients: recipients.length,
      message: message
    };
  }

  // Send welcome notification
  async sendWelcomeNotification(user) {
    if (!user.contact || !user.contact.includes('@')) {
      console.log(`Welcome notification for ${user.name} - no email provided`);
      return { success: true, sent: false };
    }

    const message = this.createWelcomeMessage(user);
    await this.sendEmail([user.contact], 'Welcome to Birthday Battle Royale! 🎉', message);
    
    console.log(`Welcome notification sent to ${user.name} (${user.contact})`);
    return { success: true, sent: true };
  }

  // Send email
  async sendEmail(recipients, subject, message) {
    if (!this.emailTransporter) {
      console.log('Email not configured - would send:');
      console.log(`To: ${recipients.join(', ')}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      return;
    }

    try {
      const mailOptions = {
        from: `"Birthday Battle Royale" <${process.env.EMAIL_USER}>`,
        to: recipients.join(', '),
        subject: subject,
        html: this.createEmailTemplate(subject, message)
      };

      await this.emailTransporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Failed to send email:', error.message);
      throw error;
    }
  }

  // Create battle message
  createBattleMessage(battle, participants) {
    const participantNames = participants.map(p => p.name).join(', ');
    return `
      🎮 NEW BATTLE ALERT! 🎮
      
      Type: ${battle.type.toUpperCase()}
      Participants: ${participantNames}
      
      Get ready to rumble! The battle starts soon.
      
      Good luck and may the best fighter win! 🏆
    `;
  }

  // Create welcome message
  createWelcomeMessage(user) {
    return `
      🎉 Welcome to Birthday Battle Royale, ${user.name}! 🎉
      
      Your profile has been created successfully!
      Phrase: "${user.phrase}"
      
      Get ready for epic battles throughout the party!
      
      May the odds be ever in your favor! 🎮
    `;
  }

  // Create HTML email template
  createEmailTemplate(subject, message) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #0A1A2F;
            color: #F2F2F2;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #1A2A4F;
            border: 3px solid #FFD700;
            border-radius: 10px;
            padding: 30px;
          }
          .header {
            text-align: center;
            color: #FFD700;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .message {
            white-space: pre-line;
            line-height: 1.6;
            font-size: 16px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #FF2D2D;
            font-weight: bold;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">${subject}</div>
          <div class="message">${message}</div>
          <div class="footer">🎮 Birthday Battle Royale 🎮</div>
        </div>
      </body>
      </html>
    `;
  }

  // General notification sender (for API endpoint)
  async sendNotification(req, res) {
    try {
      const { message, recipients, subject } = req.body;
      
      if (!message || !recipients || !Array.isArray(recipients)) {
        return res.status(400).json({
          success: false,
          message: 'Message and recipients array are required'
        });
      }

      const emailRecipients = recipients.filter(r => r.includes('@'));
      
      if (emailRecipients.length > 0) {
        await this.sendEmail(
          emailRecipients, 
          subject || 'Birthday Battle Royale Notification',
          message
        );
      }

      // Log all notifications
      recipients.forEach(recipient => {
        console.log(`Notification sent to ${recipient}: ${message}`);
      });

      res.json({
        success: true,
        sent: emailRecipients.length,
        total: recipients.length
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({
        success: false,
        message: 'Error sending notification',
        error: error.message
      });
    }
  }
}

// Create singleton instance
const notificationService = new NotificationService();

module.exports = notificationService;