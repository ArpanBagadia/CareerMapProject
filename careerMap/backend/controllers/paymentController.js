// backend/controllers/paymentController.js

const Stripe=require('stripe')
const Enrollment = require('../models/Enrollment')
const Course = require('../models/Course')
const stripe = new Stripe("sk_test_51RbfCAPJR8i3AEwYNSpWJLhj7h1C9jtFyLElKELdfo11QsR8ILFuy8p2VS5wRtOr4Zk2XRMVWOwtXTqnmwZHJBtQ004EDhnYaY"); 

exports.createCheckoutSession = async (req, res) => {
  const { course } = req.body; // contains title, price, image, etc.

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: course.title,
            images: [course.imageUrl],
          },
          unit_amount: course.price * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
      metadata: {
                courseId: course._id.toString(),
                tutorId: course._id.toString()
            },
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: 'Payment failed' });
  }
};


exports.enrollAfterPayment = async (req, res) => {
    const { sessionId, studentId } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const courseId = session.metadata.courseId;
        const tutorId = session.metadata.tutorId;

        // DEBUG log
        console.log("Enrolling student:", studentId, courseId, tutorId);

        if (!studentId || !courseId || !tutorId) {
            return res.status(400).json({ msg: "Missing required data" });
        }

        // Check already enrolled
        const already = await Enrollment.findOne({ studentId, courseId });
        if (already) {
            return res.status(400).json({ msg: "Already enrolled" });
        }

        const enroll = new Enrollment({
            studentId, // ✅ Must be non-null
            courseId,
            tutorId,
        });

        await enroll.save();
        res.status(201).json({ msg: "Enrollment saved after payment" });
    } catch (err) {
        console.error("Enroll after payment error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};

