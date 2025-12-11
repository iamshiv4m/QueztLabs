"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='currentColor'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e")`,
        }}
      />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Testimonials"
          title="What our clients say"
          description="Don't just take our word for it—hear from the teams we've partnered with."
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Gradient border effect - Aceternity style */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />

              {/* Main card */}
              <div className="relative h-full p-8 rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Quote icon with animated glow */}
                  <div className="relative mb-6">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-primary/20 blur-xl"
                    />
                    <Quote className="relative w-8 h-8 text-primary/60 group-hover:text-primary transition-colors" />
                  </div>

                  {/* Star rating with fill animation */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + i * 0.1 }}
                      >
                        <Star className="w-4 h-4 fill-primary/20 text-primary/20 group-hover:fill-primary/60 group-hover:text-primary/60 transition-all duration-300" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote className="relative mb-8">
                    <p className="text-foreground leading-relaxed text-pretty text-base">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  {/* Author section with enhanced styling */}
                  <div className="relative flex items-center gap-4 pt-6 border-t border-border/50">
                    <div className="relative">
                      {/* Animated glow ring */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100"
                      />
                      <div className="relative p-0.5 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={56}
                          height={56}
                          className="relative rounded-full border-2 border-border/50 group-hover:border-transparent transition-colors object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corner gradient accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-bl-2xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicator with gradient text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Trusted by{" "}
            <span className="font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              80+ companies
            </span>{" "}
            worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
