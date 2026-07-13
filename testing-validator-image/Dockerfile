# Start with Debian
FROM debian:bookworm-slim

# Install all necessary Debian dependencies
RUN apt-get update && apt-get install -y \
   wget \
   default-jdk \
   git \
   && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /tmp

# Download and extract Apache Ant
ENV ANT_VERSION=1.10.3
ENV ANT_HOME=/opt/ant

RUN wget --no-check-certificate --no-cookies http://archive.apache.org/dist/ant/binaries/apache-ant-${ANT_VERSION}-bin.tar.gz \
   && wget --no-check-certificate --no-cookies http://archive.apache.org/dist/ant/binaries/apache-ant-${ANT_VERSION}-bin.tar.gz.sha512 \
   && echo "$(cat apache-ant-${ANT_VERSION}-bin.tar.gz.sha512) apache-ant-${ANT_VERSION}-bin.tar.gz" | sha512sum -c \
   && tar -zvxf apache-ant-${ANT_VERSION}-bin.tar.gz -C /opt/ \
   && ln -s /opt/apache-ant-${ANT_VERSION} /opt/ant \
   && rm -f apache-ant-${ANT_VERSION}-bin.tar.gz \
   && rm -f apache-ant-${ANT_VERSION}-bin.tar.gz.sha512

RUN update-alternatives --install "/usr/bin/ant" "ant" "/opt/ant/bin/ant" 1 && \
   update-alternatives --set "ant" "/opt/ant/bin/ant" 

# Download and install Tomcat
RUN wget https://dlcdn.apache.org/tomcat/tomcat-9/v9.0.119/bin/apache-tomcat-9.0.119.tar.gz
RUN tar -xf apache-tomcat-9.0.119.tar.gz

# Download and extract W3C CSS Validator
RUN git clone https://github.com/w3c/css-validator.git

# Update servlet location for Tomcat
WORKDIR /tmp/css-validator
RUN sed -i 's/\/usr\/share\/java\/servlet-2.3.jar/\/tmp\/apache-tomcat-9.0.119\/lib\/servlet-api.jar/' ./build.xml

# Build W3C CSS Validator for Tomcat
RUN ant war

# Move built servlet to Tomcat
RUN cp /tmp/css-validator/css-validator.war /tmp/apache-tomcat-9.0.119/webapps/
WORKDIR /tmp/apache-tomcat-9.0.119

# Expose port
EXPOSE 8080

# Entrypoint
ENTRYPOINT ["./bin/catalina.sh", "run"]
